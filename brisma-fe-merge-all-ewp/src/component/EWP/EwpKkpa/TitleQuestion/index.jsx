import { BsFillQuestionCircleFill } from 'react-icons/bs';

export default function TitleQuestion({ title }) {
    return (
        <div className='flex flex-row space-x-2'>
            <h1 className='text-sm text-primary-gray font-semibold' >{title}</h1>
            <BsFillQuestionCircleFill className='text-primary-blue' />
        </div>
    )
}
