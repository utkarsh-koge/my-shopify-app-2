import React from "react";

export function LogsTable({ logs, openRow, setOpenRow, handleRestore }) {
  if (!logs || logs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 mt-10 bg-white rounded-xl border border-gray-200 shadow-sm max-w-7xl mx-auto">
        <div className="text-gray-400 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
            <polyline points="13 2 13 9 20 9"></polyline>
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">No History Found</h3>
        <p className="text-gray-500 mt-1">
          Your operation history will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-black overflow-hidden max-w-7xl max-h-[800px] overflow-y-auto mt-10 mx-auto">
      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm min-w-[800px]">
          <thead className="bg-gray-100 border-b border-black">
            <tr>
              <th className="p-3 text-left font-semibold text-black">User</th>
              <th className="p-3 text-left font-semibold text-black">
                Operation
              </th>
              <th className="p-3 text-left font-semibold text-black">Value</th>
              <th className="p-3 text-left font-semibold text-black">
                Restore
              </th>
              <th className="p-3 text-left font-semibold text-black">Time</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log, index) => (
              <React.Fragment key={log.id}>
                <LogRow
                  index={index}
                  log={log}
                  openRow={openRow}
                  setOpenRow={setOpenRow}
                  handleRestore={handleRestore}
                />

                {openRow === index && <LogDetailsRow log={log} />}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function LogRow({ log, index, openRow, setOpenRow, handleRestore }) {
  return (
    <tr className="hover:bg-gray-100 transition-colors border-b border-gray-300">
      <td className="p-3 text-black break-words">{log.userName}</td>
      <td className="p-3 text-black break-words">
        {log.operation}
        {log.objectType && (
          <span className="block text-xs text-gray-500">({log.objectType})</span>
        )}
      </td>

      <td className="p-3">
        <button
          onClick={() => setOpenRow(openRow === index ? null : index)}
          className="px-3 py-1 bg-black text-white rounded-lg shadow hover:bg-gray-800 transition w-full sm:w-auto"
        >
          View
        </button>
      </td>

      <td className="p-3">
        <button
          onClick={() => handleRestore(log)}
          className="px-3 py-1 bg-black text-white rounded-lg shadow hover:bg-gray-800 transition w-full sm:w-auto"
        >
          Restore
        </button>
      </td>

      <td className="p-3 text-black whitespace-nowrap">
        {new Date(log.time).toLocaleString()}
      </td>
    </tr>
  );
}

export function LogDetailsRow({ log }) {
  return (
    <tr className="bg-white">
      <td colSpan={5} className="p-3 border-t border-black">
        <div className="flex justify-center">
          <div className="bg-white border border-black shadow-md rounded-xl p-3 max-w-full w-full max-h-[400px] overflow-y-auto">
            <h3 className="font-semibold mb-3 text-center text-black">
              Value Details
            </h3>

            <div className="w-full overflow-x-auto">
              <table className="w-full text-xs border border-black min-w-[600px]">
                <thead className="bg-gray-200 border-b border-black">
                  <tr>
                    <th className="p-2 border border-black font-semibold">
                      Identifier
                    </th>

                    {log.operation === "Tags-removed" ? (
                      <>
                        <th className="p-2 border border-black font-semibold">
                          Removed Tags
                        </th>
                        <th className="p-2 border border-black font-semibold">
                          Success
                        </th>
                      </>
                    ) : (
                      <>
                        <th className="p-2 border border-black font-semibold">
                          Key
                        </th>
                        <th className="p-2 border border-black font-semibold">
                          Type
                        </th>
                        <th className="p-2 border border-black font-semibold">
                          Value
                        </th>
                        <th className="p-2 border border-black font-semibold">
                          Success
                        </th>
                      </>
                    )}
                  </tr>
                </thead>

                <tbody>
                  {log.value.map((v, i) => (
                    <tr key={i} className="border-b border-gray-300">
                      {/* ID */}
                      <td className="p-2 border border-black whitespace-nowrap">
                        {v.id.replace("gid://shopify/Order/", "")}
                      </td>

                      {log.operation === "Tags-removed" ? (
                        <>
                          <td className="p-2 border border-black">
                            {v.removedTags?.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {v.removedTags.map((tag, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-0.5 bg-gray-200 text-black rounded text-[10px]"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              "—"
                            )}
                          </td>

                          <td className="p-2 border border-black">
                            {v.success ? (
                              <span className="text-green-700 font-semibold">
                                Yes
                              </span>
                            ) : (
                              <span className="text-red-700 font-semibold">
                                No
                              </span>
                            )}
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="p-2 border border-black">
                            {v.data?.key || "—"}
                          </td>

                          <td className="p-2 border border-black">
                            {v.data?.type || "—"}
                          </td>

                          <td className="p-2 border border-black max-w-[200px]">
                            <pre className="whitespace-pre-wrap text-[10px] bg-gray-100 p-1 rounded border border-gray-400">
                              {v.data?.value ? v.data.value : "—"}
                            </pre>
                          </td>

                          <td className="p-2 border border-black">
                            {v.success ? (
                              <span className="text-green-700 font-semibold">
                                Yes
                              </span>
                            ) : (
                              <span className="text-red-700 font-semibold">
                                No
                              </span>
                            )}
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}
