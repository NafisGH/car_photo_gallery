import { selectDataUser } from "app/redux/slices/userReducer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./header.scss";
import { RxAvatar } from "react-icons/rx";
import Modal from "pages/Modals/ui/Modal";
import { useState } from "react";
import CreateCardModal from "pages/Modals/CreateCardModal/CreateCardModal";

const Header = () => {
  const { email } = useSelector(selectDataUser);
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate("/sign-in");
    localStorage.removeItem("token");
  };

  const [modalActive, setModalActive] = useState(false);

  return (
    <div className="header">
      <span className="nameProject">Photo gallery</span>

      <div className="header__user">
        <button className="createCard" onClick={() => setModalActive(true)}>
          Создать карточку
        </button>

        <Modal active={modalActive} setActive={setModalActive}>
          <CreateCardModal
            active={modalActive}
            setActive={setModalActive}
          ></CreateCardModal>
        </Modal>

        <span className="email">{email}</span>

        <RxAvatar className="avatar" />
        <button className="btnExit" onClick={handleLogOut}>
          Exit
        </button>
      </div>
    </div>
  );
};

export default Header;
