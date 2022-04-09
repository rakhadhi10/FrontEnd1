import { FaQuestionCircle } from 'react-icons/fa';

const defaultClass = "flex flex-row mt-8"

export default function TitleQuestion({ title, className = defaultClass }) {
  return (
    <div className={`${className} flex items-center gap-4 mb-4 mt-8`}>
      <p className="text-secondary-light-black text-3xl font-mulish font-bold">{title}</p>
      <FaQuestionCircle className="text-primary-blue text-xl cursor-pointer" />
    </div>
  )
}
