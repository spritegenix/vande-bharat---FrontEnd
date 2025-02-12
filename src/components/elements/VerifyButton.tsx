import { VscVerifiedFilled } from "react-icons/vsc";
import Button from "./Button";

export default function VerifyButton({ isVerified, onClick, disabledValidation, className }: any) {
  return (
    <div className={`${className}`}>
      {isVerified ? (
        <VscVerifiedFilled className="text-3xl text-green-500" />
      ) : (
        <Button as="div" className="!py-3" disabled={disabledValidation} onClick={onClick}>
          Verify it!
        </Button>
      )}
    </div>
  );
}
