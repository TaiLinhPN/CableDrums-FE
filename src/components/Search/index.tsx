import { Space, Input } from "antd";

const { Search } = Input;
export const find = (data: any[], search_text: string): any[] => {
  const matching_objects: any[] = [];

  const searchInObject = (obj: any): boolean => {
    for (const key in obj) {
      const value = obj[key];

      if (
        typeof value === "string" &&
        value.toLowerCase().includes(search_text.toLowerCase())
      ) {
        return true;
      }
      if (typeof value === "number" && value.toString().includes(search_text)) {
        return true;
      }
      if (typeof value === "object" && value !== null) {
        if (searchInObject(value)) {
          return true;
        }
      }
    }

    return false;
  };

  for (const obj of data) {
    if (searchInObject(obj)) {
      matching_objects.push(obj);
    }
  }

  return matching_objects;
};

interface SearchBoxProps {
  onSearch: (value: string) => void;
}
const SearchBox = ({ onSearch }: SearchBoxProps) => {
  return (
    <div>
      <Space direction="vertical">
        <Search
          size="large"
          placeholder="input search text"
          allowClear
          onSearch={(value: string) => onSearch(value)}
          style={{ width: 300 }}
          // loading
        />
      </Space>
    </div>
  );
};

export default SearchBox;
