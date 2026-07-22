import { forwardRef, useState } from "react";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import Input from "../../../components/ui/Input";

const PasswordInput = forwardRef(function PasswordInput(props, ref) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Input ref={ref} type={visible ? "text" : "password"} {...props} />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        tabIndex={-1}
        className="absolute right-3 top-[38px] text-text-secondary hover:text-text transition-colors"
        aria-label={visible ? "Hide password" : "Show password"}
      >
        {visible ? (
          <HiOutlineEyeSlash className="w-4 h-4" />
        ) : (
          <HiOutlineEye className="w-4 h-4" />
        )}
      </button>
    </div>
  );
});

export default PasswordInput;
