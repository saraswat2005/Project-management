// <button ref={ref} style={{"display": "none"}} type="button" className="btn btn-primary"
//                     data-bs-toggle="modal" data-bs-target="#exampleModal">
//                 Launch demo modal
//             </button>
//             <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
//                  aria-hidden="true">
//                 <div className="modal-dialog">
//                     <div className="modal-content">
//                         <div className="modal-header">
//                             <form className={"my-3"}>
//                                 <div className="mb-3">
//                                     <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
//                                     <input name={"title"} className="form-control" id="exampleInputEmail1"
//                                            aria-describedby="emailHelp" value={note.title} onChange={onChange}/>
//                                 </div>
//                                 {/*in the above input the value of note is the state */}
//                                 <div className="mb-3">
//                                     <label htmlFor="exampleInputEmail1" className="form-label">Tag</label>
//                                     <input name={"tag"} className="form-control" id="exampleInputEmail1"
//                                            onChange={onChange} value={note.tag} aria-describedby="emailHelp"/>
//                                 </div>
//                                 <div className="mb-3">
//                                     <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
//                                     <textArea name={"desc"} className="form-control" id="exampleInputPassword1"
//                                               rows={"8"} onChange={onChange}>{note.desc}</textArea>
//                                 </div>
//                             </form>
//
//                         </div>
//                         <div className="modal-footer">
//                             <button type="button" ref={refClose} className="btn btn-secondary"
//                                     data-bs-dismiss="modal">Close
//                             </button>
//                             <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//