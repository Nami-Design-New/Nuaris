import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useGetYachtMoreInfo from "../../../../hooks/yacht/useGetYachtMoreInfo";
import CheckItems from "../../../../ui/form-elements/CheckItems";
import SubmitButton from "../../../../ui/form-elements/SubmitButton";
import axiosInstance from "../../../../utils/axiosInstance";

const MoreInfo = ({ id, createdYachtId, formData }) => {
  const { data: moreInfo } = useGetYachtMoreInfo();
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    if (formData) {
      setSelected(formData?.more_info || []);
    }
  }, [formData]);

  useEffect(() => {
    if (moreInfo) {
      const newCategories = [];
      moreInfo.forEach((item) => {
        if (!newCategories?.find((c) => c?.id === item?.category?.id)) {
          newCategories.push(item?.category);
        }
      });
      newCategories.sort((a, b) => a?.id - b?.id);
      setCategories(newCategories);
    }
  }, [moreInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/yacht/add_more_info", {
        yacht_id: id || Number(createdYachtId),
        extra_info_ids: selected?.map((item) => item?.id),
      });
      if (res.status === 200 || res.status === 201) {
        toast.success("More Info Saved Successfully");
        queryClient.invalidateQueries({ queryKey: ["yachts"] });
        queryClient.invalidateQueries({
          queryKey: ["yacht", id || createdYachtId],
        });
        navigate("/dashboard/fleet");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fleet_form__wrapper">
      <form className="form_ui" onSubmit={handleSubmit}>
        {categories?.map((category) => (
          <div className="bg_white_card mb-3" key={category?.id}>
            <div className="row">
              <div className="col-12 p-2">
                <h6 className="form_title mb-3">{category?.name}</h6>
                <div className="elements">
                  {moreInfo
                    ?.filter((item) => item?.category?.id === category?.id)
                    ?.map((item) => (
                      <CheckItems
                        key={item?.id}
                        item={item}
                        selected={selected}
                        setSelected={setSelected}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="col-12 p-2 pt-4 d-flex gap-3">
          <SubmitButton
            loading={loading}
            className="save_btn ms-auto"
            name="Save"
          />
        </div>
      </form>
    </div>
  );
};

export default MoreInfo;
