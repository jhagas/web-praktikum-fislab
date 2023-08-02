import { parseISO } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { id } from "date-fns/locale";

type Props = {
  dateString: string;
  formatStr: string;
  className?: string;
};

const DateFormatter = ({ dateString, formatStr, className }: Props) => {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString} className={className}>
      {formatInTimeZone(date, "Asia/Jakarta", formatStr, { locale: id })}
    </time>
  );
};

export default DateFormatter;
