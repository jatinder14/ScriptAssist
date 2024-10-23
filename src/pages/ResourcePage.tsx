
import React, { useEffect, useState } from "react";
import {
  Card,
  Image,
  Text,
  Button,
  Notification,
  Grid,
  Skeleton,
  Container,
  Title,
  Select,
  TextInput,
  Group,
  Pagination,
  Center,
  Stack,
} from "@mantine/core";
import { useAuthStore } from "../state/authStore";
import { useFilterStore } from "../state/filterStore";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../styles/customStyles.css";

import '@mantine/core/styles/Card.css';
import '@mantine/core/styles/Image.css';
import '@mantine/core/styles/Text.css';
import '@mantine/core/styles/Button.css';
import '@mantine/core/styles/Notification.css';
import '@mantine/core/styles/Grid.css';
import '@mantine/core/styles/Skeleton.css';
import '@mantine/core/styles/Title.css';
import '@mantine/core/styles/Container.css';
import '@mantine/core/styles/Tooltip.css';
import '@mantine/core/styles/Combobox.css';
import '@mantine/core/styles/Pagination.css';
import '@mantine/core/styles/Center.css';


// Placeholder image URL
const PLACEHOLDER_IMAGE = "https://via.placeholder.com/300x160?text=No+Image+Available";

interface Launch {
  id: string;
  name: string;
  date_utc: string;
  rocket: string;
  success: boolean;
  links: {
    flickr: {
      original: string[];
    };
  };
}

const ResourcePage: React.FC = () => {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [filteredLaunches, setFilteredLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { search, sort, filter, setSearch, setSort, setFilter } = useFilterStore();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 40; // Set the number of items per page to 40

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        const response = await fetch("https://api.spacexdata.com/v4/launches");
        if (response.ok) {
          const data = await response.json();
          setLaunches(data);
        } else {
          setError("Failed to fetch SpaceX data");
        }
      } catch (err) {
        setError("An error occurred while fetching SpaceX data");
      } finally {
        setLoading(false);
      }
    };
    fetchLaunches();
  }, []);

  // Sync filter, sort, and search with query parameters
  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    const currentSort = searchParams.get("sort") || "asc";
    const currentFilter = searchParams.get("filter") || "all";

    setSearch(currentSearch);
    setSort(currentSort as 'asc' | 'desc');
    setFilter(currentFilter as 'all' | 'success' | 'failure');
  }, [searchParams, setSearch, setSort, setFilter]);

  // Apply filtering, sorting, and searching
  useEffect(() => {
    let result = launches;

    // Filtering based on success/failure
    if (filter !== "all") {
      result = result.filter((launch) =>
        filter === "success" ? launch.success : !launch.success
      );
    }

    // Searching by name
    if (search) {
      result = result.filter((launch) =>
        launch.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sorting by date
    result = result.sort((a, b) =>
      sort === "asc"
        ? new Date(a.date_utc).getTime() - new Date(b.date_utc).getTime()
        : new Date(b.date_utc).getTime() - new Date(a.date_utc).getTime()
    );

    setFilteredLaunches(result);
  }, [search, sort, filter, launches]);

  const handleMissionClick = (id: string) => {
    navigate(`/mission/${id}`);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ search: e.target.value, sort, filter });
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  const handleFilterChange = (value: string | null) => {
    const newValue = value as 'all' | 'success' | 'failure' | 'all';
    setSearchParams({ search, sort, filter: newValue });
    setFilter(newValue);
    setCurrentPage(1); // Reset to the first page on filter change
  };

  const handleSortChange = (value: string | null) => {
    const newValue = (value as 'asc' | 'desc') || 'asc'; // Default to 'asc' if value is null
    setSearchParams({ search, filter, sort: newValue });
    setSort(newValue);
    setCurrentPage(1); // Reset to the first page on sort change
  };

  const indexOfLastLaunch = currentPage * itemsPerPage;
  const indexOfFirstLaunch = indexOfLastLaunch - itemsPerPage;
  const currentLaunches = filteredLaunches.slice(indexOfFirstLaunch, indexOfLastLaunch);
  const totalPages = Math.ceil(filteredLaunches.length / itemsPerPage); // Total number of pages

  if (loading) {
    return (
      <Container>
        <Skeleton height={200} radius="md" mb="xl" />
        <Skeleton height={200} radius="md" mb="xl" />
        <Skeleton height={200} radius="md" mb="xl" />
      </Container>
    );
  }

  if (error) {
    return <Notification color="red">{error}</Notification>;
  }

  return (
    <Container>
      <Group mb="lg" align="flex-end" style={{ justifyContent: 'space-between' }}>
        <Title order={2} style={{ fontSize: '32px', fontWeight: '700', color: '#1a202c' }}>
          SpaceX Launches
        </Title>
        <Button onClick={handleLogout} style={{ backgroundColor: '#007bff', color: '#fff' }}>
          Logout
        </Button>
      </Group>
      
      {/* Search, filter, and sort controls */}
      <Stack mb="lg" align="flex-start">
        <TextInput
          placeholder="Search by name"
          value={search}
          onChange={handleSearchChange}
          style={{ width: '50%' }} // Use full width for consistency
        />
        <Group style={{ width: '100%' }}>
          <Select
            label="Filter by success"
            value={filter}
            onChange={handleFilterChange}
            data={[
              { value: 'all', label: 'All' },
              { value: 'success', label: 'Success' },
              { value: 'failure', label: 'Failure' },
            ]}
            style={{ width: 150 }}
            searchable
            // You can add custom styles here if needed without affecting positioning
            styles={{
              input: {
                border: '1px solid #1976D2',
                borderRadius: '8px',
                padding: '10px',
              }
            }}
          />
  
          <Select
            label="Sort by date"
            value={sort}
            onChange={handleSortChange}
            data={[
              { value: 'asc', label: 'Ascending' },
              { value: 'desc', label: 'Descending' },
            ]}
            style={{ width: 150 }}
            searchable
            styles={{
              input: {
                border: '1px solid #1976D2',
                borderRadius: '8px',
                padding: '10px',
              },
            }}
          />
        </Group>
      </Stack>
  
      <Grid gutter="lg">
        {currentLaunches.map((launch) => (
          <Grid.Col key={launch.id} span={4}>
            <Card
              shadow="lg"
              padding="lg"
              radius="md"
              withBorder
              style={{
                backgroundColor: '#f0f4f8',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0px 8px 24px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Check if images are available, if not, use the placeholder image */}
              {launch.links.flickr.original.length > 0 ? (
                <Card.Section>
                  <Image
                    src={launch.links.flickr.original[0]}
                    alt={launch.name}
                    height={160}
                    radius="sm"
                    style={{
                      objectFit: 'cover',
                    }}
                  />
                </Card.Section>
              ) : (
                <Card.Section>
                  <Image
                    src={PLACEHOLDER_IMAGE}
                    alt={launch.name}
                    height={160}
                    radius="sm"
                    style={{
                      objectFit: 'cover',
                    }}
                  />
                </Card.Section>
              )}
              <Text fw={500} size="lg" mt="md" mb="xs">{launch.name}</Text>
              <Text color="dimmed" size="sm">{new Date(launch.date_utc).toLocaleString()}</Text>
              <Text size="sm" mt="sm" mb="md">
                Rocket: {launch.rocket}
              </Text>
              <Button onClick={() => handleMissionClick(launch.id)} fullWidth>
                View Mission
              </Button>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
  
      {/* Pagination */}
      <Center>
        <Pagination
          total={totalPages}
          value={currentPage}
          onChange={setCurrentPage}
          style={{ marginTop: 20 }}
        />
      </Center>
    </Container>
  );
};

export default ResourcePage;