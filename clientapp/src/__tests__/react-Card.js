import React from 'react';
import { render } from '@testing-library/react';
import { Card } from '../components/Card';

const message = {
  type: "type",
  title: "title",
  street: "street",
  city: "city",
  state: "state",
  zip: "zip",
  description: "description"
};

test('renders Card showing message', () => {
    const { getByText } = render(<Card open={true} cardInfo={message} startDate={"7/11/2020"} endDate={"7/14/2020"} startTime={"05:00 PM"} endTime={"05:00 PM"} />);
    const titleElement = getByText(/title/);
    const streetElement = getByText(/street/);
    const cityStateZipElement = getByText(/city, state zip/);
    const datesElement = getByText(/7\/11\/2020 to 7\/14\/2020/);
    const timeElement = getByText(/05:00 PM to 05:00 PM/)
    expect(titleElement).toBeInTheDocument();
    expect(streetElement).toBeInTheDocument();
    expect(cityStateZipElement).toBeInTheDocument();
    expect(datesElement).toBeInTheDocument();
    expect(timeElement).toBeInTheDocument();
  });

test('renders Card showing add to calendar link', () => {
  const { getByText } = render(<Card open={true} cardInfo={message} startDate={"7/11/2020"} endDate={"7/14/2020"} startTime={"05:00 PM"} endTime={"05:00 PM"} />);
  const calendarButtonElement = getByText(/Add to calendar/);
  expect(calendarButtonElement).toBeInTheDocument();
});