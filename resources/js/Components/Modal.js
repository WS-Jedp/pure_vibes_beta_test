import React from "react";

export default function Modal({title, showModal, setShowModal, onSave = null, nameSave = "Save", message, messageColor="text-amber-400", children}) {
//   const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {title}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="scroll-bar max-h-[20rem] md:max-h-[35rem] min-w-[20rem] overflow-hidden relative p-6 flex-auto overflow-y-scroll">
                    {children}
                </div>
                {/*footer*/}
                <div className="flex-column items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    {
                        message && (
                            <>
                            <p className={`${messageColor}`}>
                                {message}
                                </p>
                                {/* <br/> */}
                            </>
                        )
                    }

                    <div className="flex items-center justify-end">
                        <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>
                        <button type='submit' className='relativie flex items-center p-3 rounded-xl my-4 shadow-md text-white justify-center bg-gradient-to-r from-purple-400 to-cyan-300
                            duration-300 ease-in-out hover:scale-[1.03] hover:shadow-xl
                        ' onClick={() => onSave()}>{nameSave}</button>
                    </div>
                  {/* <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save
                  </button> */}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
