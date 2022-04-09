import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import NotificationItem from "./NotificationItem";

export default function NotificationContainer({ items }){

  const navigate = useNavigate()

  const handleOnClickSeeNotifications = () => navigate("/notification")
  
  return (
    <section className="max-w-md space-y-4">
      {[...Array(3)].map(item => (<NotificationItem />))}
      <div 
        className="pt-2 border-t border-gray-400 cursor-pointer"
        onClick={handleOnClickSeeNotifications}
      >
        <p className="text-primary-blue text-center">See All Notifications</p>
      </div>
    </section>
  );
}

NotificationContainer.propTypes = {
  items: PropTypes.arrayOf(NotificationItem)
}