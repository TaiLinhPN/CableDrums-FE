interface TheadProps {
  titles: string[]
}
const Thead = ({ titles }: TheadProps) => {
  return (
    <thead>
      <tr>
        {titles.map((title, index) => (
          <th
            key={index}
            className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
          >
            {title}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default Thead