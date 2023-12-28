import ListAppliedMentor from "./components/ListMentorItem";

function LearningProgress() {
  return (
    <div>
      <div className="px-5 py-5">
        <h3>Tiến trình học của bạn</h3>
        <ListAppliedMentor></ListAppliedMentor>
      </div>
    </div>
  );
}

export default LearningProgress;
