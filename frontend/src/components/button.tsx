import Button from "react-bootstrap/Button";

function CustomButton({
  text,
  variant,
  onClickFunc = null,
}: {
  text: string;
  variant: string;
  onClickFunc?: any;
}) {
  return (
    <>
      <Button onClick={onClickFunc ? onClickFunc : () => {}} variant={variant}>
        {text}
      </Button>{" "}
    </>
  );
}

export default CustomButton;
