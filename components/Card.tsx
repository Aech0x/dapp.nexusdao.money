interface CardProps {
  title: string
  value?: string
}

const Card: React.FC<CardProps> = ({ title, value, children }) => {
  return (
    <div className="flex flex-col justify-center rounded-lg py-4 bg-white dark:bg-slate-800 drop-shadow-md items-center">
      <span className="cardTitle">{title}</span>
      {value != null ? (
        <span className="text-2xl font-bold dark:text-white">{value}</span>
      ) : (
        children
      )}
    </div>
  )
}

export default Card
