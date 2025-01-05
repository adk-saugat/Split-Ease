import { useEffect, useState } from "react"
import { getDocument } from "../../utils/firebase-utils"

const ActiveGroup = ({ activeGroupId }) => {
  const [activeGroupData, setActiveGroupData] = useState({})

  const fetchGroupExpense = async () => {
    const groupData = await getDocument("groups", activeGroupId)
    setActiveGroupData(groupData)
  }
  useEffect(() => {
    fetchGroupExpense()
  }, [activeGroupId])

  return (
    <>
      <div className="active-group-header">
        <h1 className="active-group-title">{activeGroupData.groupName}</h1>
      </div>
      <div className="expense-list-container"></div>
    </>
  )
}

export default ActiveGroup
