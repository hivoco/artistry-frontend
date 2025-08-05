import Image from "next/image";

const FloweryImage = ({className}) => {
  return (
    <Image
      className={`h-[27vh] w-auto ${className}`}
      src={"/images/flowery-creams.png"}
      alt="logo"
      width={260}
      height={220}
      priority={true}
    />
  );
};

export default FloweryImage;
