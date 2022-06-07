import Map, { Marker, NavigationControl, FullscreenControl, ScaleControl} from 'react-map-gl';
import "./App.css"
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, HitsPerPage, SearchBox, Highlight, Hits, useHits } from 'react-instantsearch-hooks-web';

const TOKEN = 'pk.eyJ1Ijoibml0aW5iaGFzbmVyaWEiLCJhIjoiY2w0MWI0dmVhNDY0YjNjb2V6NzhmMXhtbiJ9.xQksCpwX-W60H3CLxjDV4g';
const searchClient = algoliasearch('LZMOMS4LVO', '04d988bde0d9187363c1043baf76316d');

const App = () => {

  const CustomHits = (props) => {
    const { hits } = useHits(props);
    console.log(hits);
    return (
      hits.map(hit => {
        return (
          <Marker key={hit.id} longitude={hit.lng} latitude={hit.lat} anchor="bottom" >
            <div className='markers'>
              <img src={hit.photo} />
              <div className='details'>
                {/* <Highlight attribute={hit.fullName}></Highlight> */}
                {/* <h3>{hit.fullName}</h3> */}
                <h3>
                  <Highlight attribute="fullName" hit={hit} />
                </h3>
                <p>{hit.companyName}</p>
              </div>
            </div>
          </Marker>
        )
        
      })
    )
  }
  return (
    <>
      
      <Map
        initialViewState={{
          longitude: 30,
          latitude:30,
          zoom: 1.5
        }}
        style={{width: "100%", height: "100vh"}}
        mapStyle="mapbox://styles/mapbox/light-v10"
        mapboxAccessToken={TOKEN}
      >

        <FullscreenControl position="bottom-right" />
        <NavigationControl position="bottom-right" />
        <ScaleControl />
        
        
        <InstantSearch searchClient={searchClient} indexName="data_final">
          <HitsPerPage style={{display: "none"}}
            items={[
              {value: 500, default: true }
            ]}
          />
          <SearchBox className='searchBox' />
          <CustomHits/>
        </InstantSearch>
      </Map>
    </>
  );
}

export default App