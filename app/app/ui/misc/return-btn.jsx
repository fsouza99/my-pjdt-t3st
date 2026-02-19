import Image from 'next/image';


export default function ReturnButton(props) {
  return (
    <button
      className={`w-3rem btn bg-site-2nd ${props.className}`}
      disabled={props.disabled}
      onClick={props.onClick}
      type="button">
      <Image
        src="/arrow-left.svg"
        alt="Ícone de retorno."
        width={16}
        height={16} />
    </button>
  );
}

