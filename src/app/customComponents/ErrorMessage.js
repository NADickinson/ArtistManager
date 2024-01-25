export const ErrorMessage = ({ opacity }) => {
  return (
    <div style={{ opacity: opacity, transition: 'opacity 3000ms' }}>
      {'Please enter a name'}
    </div>
  );
};
