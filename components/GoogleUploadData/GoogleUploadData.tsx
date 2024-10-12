import GoogleUploadDataTemplate from "./GoogleUploadData.template";
import useGoogleFetching from "@/hooks/useGoogleFetching";

const GoogleUploadData = () => {
  const { inputs, handleInputChange, addExpense } = useGoogleFetching();

  return (
    <GoogleUploadDataTemplate
      inputs={inputs}
      handleInputChange={handleInputChange}
      addExpense={addExpense}
    />
  );
};

export default GoogleUploadData;
