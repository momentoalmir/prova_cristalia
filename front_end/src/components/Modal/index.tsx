import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface SimpleModalProps {
    title: string;
    children: React.ReactNode;
    btn: {
        variant?: string;
        classes?: string;
        text: React.ReactNode;
        style?: React.CSSProperties;
        saveChanges?: () => void;
        beforeOpen?: () => void;
        afterClose?: () => void;
        disabled?: boolean;
    };
}

const SimpleModal = React.memo(({ title, children, btn }: SimpleModalProps) => {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        if (btn.afterClose) btn.afterClose();
        setShow(false);
    };
    const handleShow = () => {
        if (btn.beforeOpen) btn.beforeOpen();
        setShow(true);
    };

    return (
        <>
            <Button
                onClick={handleShow}
                className={btn.classes}
                style={btn.style}
                variant={btn.variant}
            >
                {btn.text}
            </Button>

            <Modal show={show} onHide={handleClose} animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{children}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                    {btn.saveChanges && (
                        <Button
                            variant="primary"
                            onClick={() => {
                                handleClose();
                                if (btn.saveChanges) btn.saveChanges();
                            }}
                            disabled={btn.disabled}
                        >
                            Salvar Alterações
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
});

export default SimpleModal;
