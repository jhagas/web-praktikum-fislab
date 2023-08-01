import { parseISO, format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { id } from "date-fns/locale";

type Props = {
  dateString: string;
  formatStr: string;
};

const DateFormatter = ({ dateString, formatStr }: Props) => {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString}>
      {formatInTimeZone(date, 'Asia/Jakarta', formatStr, { locale: id })}
    </time>
  );
};

export default DateFormatter;
