import { Button, Select, Title } from '@mantine/core'
import React from 'react'
import '@mantine/core/styles/Button.css';

const Test = () => {
  const handleChange = () => {
    console.log('Option changed')
  }
  return (<>
    <Title> Hey</Title>
    <Button variant='filled' radius='lg' color='red'>Click Me </Button>
    <Select label='Test Selection' data={['Opt1', 'Opt2', 'Opt3']}>

    </Select>
  </>
  )
}

export default Test