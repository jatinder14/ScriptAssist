import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Skeleton, Notification, Card, Text, Button, TextInput, Container, Image,
  Divider, Group, Badge, Title, List
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { IconRocket, IconMapPin, IconSatellite, IconCalendar, IconPlaneTilt } from '@tabler/icons-react'; 

import '@mantine/carousel/styles.css';
import '@mantine/core/styles/Skeleton.css'
import '@mantine/core/styles/Notification.css'
import '@mantine/core/styles/Card.css'
import '@mantine/core/styles/Text.css'
import '@mantine/core/styles/Button.css'
import '@mantine/core/styles/Input.css'
import '@mantine/core/styles/Container.css'
import '@mantine/core/styles/Image.css'
import '@mantine/core/styles/Divider.css'
import '@mantine/core/styles/Group.css'
import '@mantine/core/styles/Badge.css'
import '@mantine/core/styles/Title.css'
import '@mantine/core/styles/List.css'


interface MissionDetails {
  name: string;
  date_utc: string;
  rocket: string;
  success: boolean;
  details: string;
  flight_number: number;
  launchpad: string;
  payloads: string[];
  links: {
    flickr: {
      original: string[];
    };
  };
  user_info?: string;
}

interface RocketDetails {
  name: string;
}

interface LaunchpadDetails {
  name: string;
}

const MissionDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [mission, setMission] = useState<MissionDetails | null>(null);
  const [rocket, setRocket] = useState<RocketDetails | null>(null);
  const [launchpad, setLaunchpad] = useState<LaunchpadDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMissionDetails = async () => {
      try {
        const response = await fetch(`https://api.spacexdata.com/v4/launches/${id}`);
        if (response.ok) {
          const data = await response.json();
          setMission(data);

          // Fetch additional rocket and launchpad details
          const rocketResponse = await fetch(`https://api.spacexdata.com/v4/rockets/${data.rocket}`);
          const rocketData = await rocketResponse.json();
          setRocket(rocketData);

          const launchpadResponse = await fetch(`https://api.spacexdata.com/v4/launchpads/${data.launchpad}`);
          const launchpadData = await launchpadResponse.json();
          setLaunchpad(launchpadData);
        } else {
          setError('Failed to fetch mission details');
        }
      } catch (err) {
        setError('An error occurred while fetching mission details');
      } finally {
        setLoading(false);
      }
    };

    fetchMissionDetails();
  }, [id]);

  const handleUserInput = () => {
    setMission((prevMission) =>
      prevMission ? { ...prevMission, user_info: userInfo } : null
    );
    setEditMode(false);
    setUserInfo('');
  };

  if (loading) {
    return (
      <Container>
        <Skeleton height={400} radius="md" mb="lg" />
        <Skeleton height={200} radius="md" mb="lg" />
      </Container>
    );
  }

  if (error) {
    return <Notification color="red">{error}</Notification>;
  }

  return (
    <Container p="auto">
       <Group mb="lg" justify='space-between' p={'1rem'}>
        <Title order={1}>Mission Details</Title>
        {/* Back Button */}
        <Button variant="light" onClick={() => navigate('/missions')}>
          Back to Missions
        </Button>
      </Group>
      {mission && (
        <Card shadow="md" padding="lg" radius="md" style={{ maxWidth: '800px', margin: 'auto', backgroundColor: '#f8fafc' }}>
          {/* Carousel for displaying images */}
          {mission.links?.flickr.original.length > 0 ? (
            <Carousel withIndicators loop height={400} slideSize="100%" align="start">
              {mission.links.flickr.original.map((image, index) => (
                <Carousel.Slide key={index}>
                  <Image
                    src={image}
                    alt={`Mission Image ${index + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                  />
                </Carousel.Slide>
              ))}
            </Carousel>
          ) : (
            <Text>No images available for this mission.</Text>
          )}

          {/* Mission Title */}
          <Group mt="lg">
            <Text size="xl" fw={700} style={{ color: '#1a202c' }}>
              {mission.name}
            </Text>
            {mission.success ? (
              <Badge color="green" size="lg" variant="filled">Successful</Badge>
            ) : (
              <Badge color="red" size="lg" variant="filled">Failed</Badge>
            )}
          </Group>

          <Divider my="lg" />

          {/* Flight Info */}
          <Text size="md" color="dimmed" mb="sm">
            <Group>
              <IconPlaneTilt size={18} />
              <strong>Flight Number:</strong> {mission.flight_number}
            </Group>
          </Text>

          {/* Rocket Info */}
          {rocket && (
            <Text size="md" color="dimmed" mb="sm">
              <Group>
                <IconRocket size={18} />
                <strong>Rocket Name:</strong> {rocket.name}
              </Group>
            </Text>
          )}

          {/* Launchpad Info */}
          {launchpad && (
            <Text size="md" color="dimmed" mb="sm">
              <Group >
                <IconMapPin size={18} />
                <strong>Launch Site:</strong> {launchpad.name}
              </Group>
            </Text>
          )}

          {/* Launch Date */}
          <Text size="md" color="dimmed" mb="sm">
            <Group >
              <IconCalendar size={18} />
              <strong>Launch Date:</strong> {new Date(mission.date_utc).toLocaleDateString()}
            </Group>
          </Text>

          {/* Mission Details */}
          <Text size="md" mt="md" color="#2d3748">
            <strong>Details:</strong> {mission.details || 'No details available'}
          </Text>

          {/* Payload Info */}
          {mission.payloads && mission.payloads.length > 0 && (
            <>
              <Title order={3} mt="lg">Payloads</Title>
              <List size="sm" icon={<IconSatellite size={20} />}>
                {mission.payloads.map((payload, index) => (
                  <List.Item key={index}>{payload}</List.Item>
                ))}
              </List>
            </>
          )}

          {/* Additional Info */}
          {mission.user_info && (
            <Text size="md" color="teal" mt="md" td={'italics'}>
              <strong>Additional Info:</strong> {mission.user_info}
            </Text>
          )}

          {/* Custom Information Input */}
          {!editMode ? (
            <Button onClick={() => setEditMode(true)} mt="lg">
              Add Custom Information
            </Button>
          ) : (
            <div>
              <TextInput
                value={userInfo}
                onChange={(e) => setUserInfo(e.target.value)}
                placeholder="Enter additional information"
                mt="lg"
              />
              <Button onClick={handleUserInput} disabled={!userInfo.trim()} mt="sm" mr='md'>
                Submit Information
              </Button>
              <Button variant="outline" color="red" onClick={() => setEditMode(false)} mt="sm">
                Cancel
              </Button>
            </div>
          )}
        </Card>
      )}
    </Container>
  );
};

export default MissionDetailsPage;