import { useNavigate } from "react-router-dom";
import CardProjectEWP from "../../../../component/EWP/common/CardProjectEWP";
import { useParams } from "react-router-dom";
import {
  CardList,
  CardInfoKkpa,
  MenuListData,
  KkpaLayout,
} from "../../../../component/EWP/EwpKkpa";
const breadcrumb = [
  {
    title: "BRISMA",
    link: "/dashboard",
  },
  {
    title: "EWP",
    link: "/",
  },
  {
    title: "20210011",
    link: "/",
  },
  {
    title: "KKPA",
    link: "/",
  },
];

export default function EwpKkpa() {
  const params = useParams()
  const navigate = useNavigate();

  return (
    <KkpaLayout title="EWP" breadcrumb={breadcrumb} kkpa_id={params.kkpa_id}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <CardProjectEWP />
        </div>
        <div>
          <CardInfoKkpa />
        </div>
      </div>
      <div className="py-8 gap-x-10 grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-4 md:gap-8 lg:gap-8">
        {MenuListData.map((item, key) => {
          const { title, description, status, image, url } = item;
          return (
            <CardList
              onClick={() => navigate({ pathname: `${url}/${params.project_id}/${params.kkpa_id}` })}
              key={key}
              title={title}
              description={description}
              status={status}
              image={image}
              url={url}

            />
          );
        })}
      </div>
    </KkpaLayout>
  );
}
