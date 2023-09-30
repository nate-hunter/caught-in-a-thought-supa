import { useParams } from 'react-router-dom';

export const AllPosts = () => {
  const { pageNumber } = useParams();
  return (
    <div>
      <h2>AllPosts...</h2>
      <h3>Page: {pageNumber}</h3>
    </div>
  );
};
