import { MutatingDots } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div className="Loader">
      <MutatingDots
        color="blue"
        secondaryColor="darkBlue"
        height="100"
        width="100"
        radius="12.5"
      />
    </div>
  );
};
