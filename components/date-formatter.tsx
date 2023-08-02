import { format, parseISO } from "date-fns";
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
      {format(date, formatStr, { locale: id })}
    </time>
  );
};

export default DateFormatter;
