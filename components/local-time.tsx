import React from 'react';

export const LocalTime = () => {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const render = new Intl.DateTimeFormat('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Europe/Berlin',
  }).format(time);

  return (
    <p className="hidden text-foreground-lighter tabular-nums sm:block">
      {render}
    </p>
  );
};
