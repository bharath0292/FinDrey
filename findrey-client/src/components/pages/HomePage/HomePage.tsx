'use client';

// import Grid, { Column } from '@findrey/components/ui/Grid';
// import { GridDataType } from '@findrey/components/ui/Grid/Grid';

// interface DataType extends GridDataType {
//   userId: string;
//   id: string;
//   title: string;
//   completed: string;
// }

function HomePage() {
  return <h1>Homepage</h1>;
}

// function HomePage() {
//   const [data, setData] = useState<DataType[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           'https://jsonplaceholder.typicode.com/todos',
//         );
//         const jsonData = await response.json();

//         setData(jsonData);
//         setLoading(false); // Set loading to false when data is fetched
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>; // Render a loading state while fetching data
//   }

//   return (
//     <div style={{ height: '500px' }}>
//       <Grid data={data}>
//         <Column id="id" label="ID" type="text" />
//         <Column id="userId" label="User ID" type="text" />
//         <Column id="title" label="Title" type="text" />
//         <Column id="completed" label="Completed" type="text" />
//       </Grid>
//     </div>
//   );
// }

export default HomePage;
