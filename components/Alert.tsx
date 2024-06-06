const ALERT_MAP = {
  error: "border-red-600 bg-red-200 text-red-600",
  success: "border-green-600 bg-green-200 text-green-600",
  warning: "border-orange-600 bg-orange-200 text-orange-600",
};

interface AlertProps {
  children: React.ReactNode;
  type: keyof typeof ALERT_MAP;
}

const Alert = ({ children, type }: AlertProps) => {
  const colorClasses = ALERT_MAP[type];
  return (
    <div className={`p-4 rounded-md border ${colorClasses}`}>{children}</div>
  );
};

export default Alert;
