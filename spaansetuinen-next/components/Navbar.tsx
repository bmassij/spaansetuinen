export default function Navbar() {
  return (
    <nav className="bg-green-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Voorbeeldlogo</div>
        <ul className="flex space-x-4">
          <li><a href="/">Menu item</a></li>
          <li><a href="/bomen">Menu item</a></li>
          <li><a href="/contact">Menu item</a></li>
        </ul>
      </div>
    </nav>
  );
}