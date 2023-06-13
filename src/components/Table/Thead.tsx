interface TheadProps {
  titles: string[]
}
const Thead = ({ titles }: TheadProps) => {
  return (
    <thead className="bg-gradient-to-r from-bazaar to-maize w-full  ">
      <tr>
        {titles.map((title, index) => (
          <th
            key={index}
            className="px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
          >
            {title}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default Thead