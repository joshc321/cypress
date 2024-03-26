'use client';

import dynamic from "next/dynamic";
const MapComponent = dynamic(() => import('../components/MapComponent').then((mod) => mod.MapComponent), { ssr: false });

export const MapLayout = () => {
    return (
        <div>
            <MapComponent locations={[
                {
                    name: 'Location 1',
                    description: 'Description 1',
                    latitude: 33.661911,
                    longitude: -117.831383,
                },
                {
                    name: 'Location 2',
                    description: 'Description 2',
                    latitude: 33.661911,
                    longitude: -117.931383,
                },
            ]} />
        </div>
    );
}