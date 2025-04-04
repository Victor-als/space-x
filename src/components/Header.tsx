export default function Header() {
  return (
    <header
      className="flex py-5 pl-16 fixed w-full items-center justify-between
      backdrop-filter border-2 border-slate-600/10 backdrop-blur-sm bg-clip-padding 
      bg-opacity-10 z-10 h-20" 
    >
      <p className="text-white font-bold text-3xl">
        Space
        <span className="font-normal text-indigo-500">X</span>
      </p>
    </header>
  );
}