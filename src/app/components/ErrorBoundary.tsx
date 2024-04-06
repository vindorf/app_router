type Props = {
    children: React.ReactNode;
   
}
const ErrorBoundary = ({ children }:Props) => {
    // Define the ErrorBoundary component here
    return (
      <div>
        {children}
      </div>
    );
  };

  export default ErrorBoundary;