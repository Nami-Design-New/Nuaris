import { useEffect, useState } from "react";
import { handleFileUpload, handleRemoveMedia } from "../../../../utils/helper";
import { s3Url } from "../../../../utils/constants";
import { Link } from "react-router-dom";
import MediaUploadField from "../../../../ui/form-elements/MediaUploadField";
import RequestPhotoSession from "../../../../ui/RequestPhotoSession";

const Media = ({ id, media, createdYachtId }) => {
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState([]);

  useEffect(() => {
    if (media) {
      setImages(
        media?.filter((media) => media?.type === "IMAGE" && media?.is_active) ||
          []
      );
      setVideo(
        media?.find((media) => media?.type === "VIDEO" && media?.is_active) ||
          {}
      );
    }
  }, [media]);

  return (
    <div className="fleet_form__wrapper">
      <div className="bg_white_card">
        <form className="form_ui">
          <div className="row">
            <div className="col-12 p-2">
              <h6 className="form_title">Media & Photos</h6>
            </div>

            <div className="col-12 p-2">
              <RequestPhotoSession />
            </div>

            {/* photo upload */}
            <div className="col-12 p-2">
              <div className="input-field">
                <label htmlFor="photos">
                  Upload Photos <span>( Maximum 5 Pictures )</span>
                </label>
                <div className="photos">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <MediaUploadField
                        key={i}
                        allowMultiple={false}
                        accept={["image/*"]}
                        pannelRatio=".88"
                        labelIdle={`${
                          i === 0
                            ? '<label class="mainImg">Main Image</label>'
                            : ""
                        } <img src="/images/fav.png" alt="fav"/>`}
                        files={images[i] ? [s3Url + images?.[i]?.path] : null}
                        handleFileUpload={(file) =>
                          handleFileUpload(
                            id || Number(createdYachtId),
                            "FLEET",
                            file
                          )
                        }
                        handleRemoveMedia={handleRemoveMedia}
                        itemId={id || Number(createdYachtId)}
                        itemType="FLEET"
                        mediaId={images?.[i]?.id}
                      />
                    ))}
                </div>
              </div>
            </div>

            {/* video upload */}
            <div className="col-12 p-2">
              <MediaUploadField
                label="Upload Video"
                hint="( Max Size 200MB )"
                labelIdle="Drag & Drop your files or Browse"
                pannelRatio=".2"
                accept={["video/*"]}
                allowMultiple={false}
                files={video && video?.path ? [s3Url + video?.path] : null}
                handleFileUpload={(file) =>
                  handleFileUpload(id || Number(createdYachtId), "FLEET", file)
                }
                handleRemoveMedia={handleRemoveMedia}
                itemId={id || Number(createdYachtId)}
                itemType="FLEET"
                setVideo={setVideo}
                mediaId={video?.id}
              />
            </div>

            <div className="col-12 p-2 pt-4 d-flex">
              <Link
                to={
                  id
                    ? `/dashboard/fleet/edit-yacht/${id}/boat-specification`
                    : `/dashboard/fleet/add-yacht/boat-specification?yacht_id=${createdYachtId}`
                }
                className="save_btn ms-auto log d-flex align-items-center justify-content-center"
              >
                Next
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Media;
