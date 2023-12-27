import { format } from "date-fns";
import { Button, Label, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineEye } from "react-icons/hi";
import learningProgressApi from "../../../../api/learningProgress";
import { ApprovalStatus } from "../../../../constants";
import firebaseInstance from "../../../../services/firebase";
import { useMenteeAppliStore } from "../../../../store/menteeAppli";
import { useUserStore } from "../../../../store/userStore";

export default function ViewApplicationDetail({
  resetSelectedItems,
  application,
}) {
  console.log("application6", application);
  const { user } = useUserStore();
  const menteeProfile = application.menteeProfile;
  const [isOpen, setOpen] = useState(false);
  const [isShow, setShow] = useState(false);

  const { updateMenteeAppliStatus } = useMenteeAppliStore();
  //   const {applications, updateApplicationStatus} = useApplicationStore();
  // const onImageClick = () => {
  //   setShow(true);
  // };

  const closeModal = () => {
    if (isOpen && !isShow) {
      setOpen(false);
    }
    setShow(false);
  };

  const saveEventToMentorCalendar = async () => {
    console.log("saveEventToMentorCalendar", application.learningTime);
    await Promise.all(
      application.learningTime.map(async (time) => {
        const dayOfWeek = new Date(time.start).getDay();
        await firebaseInstance.addEvent(user.id, dayOfWeek, time);
      })
    );
  };
  const handleAcceptApplication = async () => {
    try {
      await updateMenteeAppliStatus(application.id, ApprovalStatus.APPROVED);
      await learningProgressApi.createLearningProgress(application);
      await saveEventToMentorCalendar();
      resetSelectedItems();
      setOpen(false);
    } catch (er) {
      console.error("update application er", er);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const modal = document.getElementById("modal");
      if (modal && !modal.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Button color="blue" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-2">
          <HiOutlineEye className="text-lg" />
          Xem
        </div>
      </Button>
      <Modal style={{}} onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Thông tin học viên</strong>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <img
              style={{ marginRight: 20 }}
              src={menteeProfile.avatar}
              width={200}
              height={160}
            ></img>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Label style={{ fontWeight: "bold" }} htmlFor="firstName">
                  Họ và tên:{" "}
                </Label>
                <div className="mt-1">
                  <p style={styles.text}>
                    {menteeProfile.firstName + " " + menteeProfile.lastName}
                  </p>
                </div>
              </div>
              <div>
                <Label style={{ fontWeight: "bold" }} htmlFor="lastName">
                  Ngày sinh:{" "}
                </Label>
                <div className="mt-1">
                  <p style={styles.text}>
                    {format(new Date(menteeProfile.dateOfBirth), "dd-MM-yyyy")}
                  </p>
                </div>
              </div>
              <div>
                <Label style={{ fontWeight: "bold" }} htmlFor="phone">
                  Số điện thoại:{" "}
                </Label>
                <div className="mt-1">
                  <p style={styles.text}>{menteeProfile.phoneNumber}</p>
                </div>
              </div>
              <div>
                <Label style={{ fontWeight: "bold" }} htmlFor="email">
                  Email:{" "}
                </Label>
                <div className="mt-1">
                  <p style={styles.text}>{menteeProfile.email}</p>
                </div>
              </div>
              {/* <div>
                <Label htmlFor="job">Nghề nghiệp</Label>
                <div className="mt-1">
                  <p style={styles.text}>Mobile Developer</p>
                </div>
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <div className="mt-1"></div>
              </div> */}
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <Label style={{ fontWeight: "bold" }} htmlFor="department">
              Giới thiệu bản thân:
            </Label>
            <div className="mt-1">
              <p style={styles.text}>
                {application.personalDescription || "Không có"}
              </p>
            </div>
            <Label style={{ marginTop: 12 }} htmlFor="department">
              Mong đợi của học viên:
            </Label>
            <div className="mt-1">
              <p style={styles.text}>{application.expectation || "Không có"}</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={
              application.status === ApprovalStatus.APPROVED ||
              application.status === ApprovalStatus.REJECTED
            }
            style={{ alignSelf: "flex-end", marginLeft: "auto" }}
            color="blue"
            onClick={handleAcceptApplication}
          >
            Chấp thuận
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        onClick={(e) => e.stopPropagation()}
        style={{}}
        onClose={() => setShow(false)}
        show={isShow}
      >
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Chứng chỉ</strong>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{ marginRight: 20 }}
              src="https://picsum.photos/200/300"
              width={200}
              height={160}
            ></img>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

const styles = {
  div: {
    display: "flex",
    flexDirection: "row",
  },
  text: {
    color: "black",
    margin: 0,
  },
};
