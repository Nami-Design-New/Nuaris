import { useEffect, useState } from "react";
import { handleFileUpload, handleRemoveMedia } from "../../../../utils/helper";
import { s3Url } from "../../../../utils/constants";
import MediaUploadField from "../../../../ui/form-elements/MediaUploadField";
import RequestPhotoSession from "../../../../ui/RequestPhotoSession";

export default function Media({ media, id, createdPackageId, setForm }) {
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
    <div className="form_ui">
      <div className="row">
        <div className="col-12 p-2">
          <h6 className="form_title">Addon Media</h6>
        </div>

        <div className="col-12 p-2">
          <RequestPhotoSession />
        </div>

        {/* photo upload */}
        <div className="col-12 p-2">
          <div className="input-field">
            <label htmlFor="photos">
              Upload Photos <span>( Maximum 3 Pictures )</span>
            </label>
            <div className="photos">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <MediaUploadField
                    key={i}
                    allowMultiple={false}
                    accept={["image/*"]}
                    pannelRatio=".5"
                    files={images[i] ? [s3Url + images?.[i]?.path] : null}
                    handleRemoveMedia={handleRemoveMedia}
                    itemId={id || Number(createdPackageId)}
                    itemType="TRIP"
                    mediaId={images?.[i]?.id}
                    labelIdle={`${
                      i === 0 ? '<label class="mainImg">Main Image</label>' : ""
                    } <img src="/images/fav.png" alt="fav"/>`}
                    handleFileUpload={(file) =>
                      handleFileUpload(
                        id || Number(createdPackageId),
                        "TRIP",
                        file
                      )
                    }
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
              handleFileUpload(
                id || Number(createdPackageId),
                "TRIP",
                file
              )
            }
            handleRemoveMedia={handleRemoveMedia}
            itemId={id || Number(createdPackageId)}
            itemType="TRIP"
            mediaId={video?.id}
          />
        </div>

        <div className="col-12 p-2 pt-4 d-flex gap-3">
          <button className="next_btn" onClick={() => setForm("Main Info")}>
            Back
          </button>
          <button
            className="save_btn ms-auto log"
            onClick={() => setForm("Package Time & Price")}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
