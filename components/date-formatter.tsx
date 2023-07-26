import { parseISO, format } from "date-fns";
import { id } from "date-fns/locale";

type Props = {
  dateString: string;
  formatStr: string;
};

const DateFormatter = ({ dateString, formatStr }: Props) => {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString}>
      {format(date, formatStr, { locale: id })}
    </time>
  );
};

export default DateFormatter;
