import React from 'react';
import useLatestData from '../utils/useLatestData';
import LoadingGrid from '../components/LoadingGrid';
import { HomePageGrid } from '../styles/Grids';

function CurrentSlicing({ slicemasters }) {
  return (
    <div>
      {!slicemasters && <LoadingGrid count={4} />}
      {slicemasters && !slicemasters?.length && <p>No one is working</p>}
    </div>
  );
}
function HotSlices({ hotSlices }) {
  return (
    <div>
      {!hotSlices && <LoadingGrid count={4} />}
      {hotSlices && !hotSlices?.length && <p>Nothing in the case</p>}
    </div>
  );
}

export default function HomePage() {
  const { slicemasters, hotSlices } = useLatestData();

  return (
    <div className="center">
      <h1>The Best Pizza Downtown!</h1>
      <p>Open 11am to 11pm every single day</p>
      <HomePageGrid>
        <CurrentSlicing slicemasters={slicemasters} />
        <HotSlices hotSlices={hotSlices} />
      </HomePageGrid>
    </div>
  );
}
