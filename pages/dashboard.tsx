import type { NextPage } from "next"
import { useSelector } from "react-redux"
import { RootState } from "../store"
import { Tier } from "../slices/nodes"
import { Status } from "../helpers/state"

import Card from "../components/Card"
import Spinner from "../components/Spinner"

const Dashboard: NextPage = () => {
  const status = useSelector((state: RootState) => state.nodes.status)
  const tiers = useSelector((state: RootState) => state.nodes.global.tiers)

  return (
    <>
      {status.global === Status.Success ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
          <Card
            title="Total Nodes"
            value={`${
              tiers[Tier.Gold].count +
              tiers[Tier.Silver].count +
              tiers[Tier.Bronze].count
            }`}
          />

          <Card title="Gold Nodes" value={`${tiers[Tier.Gold].count}`} />
          <Card title="Silver Nodes" value={`${tiers[Tier.Silver].count}`} />
          <Card title="Bronze Nodes" value={`${tiers[Tier.Bronze].count}`} />
          <Card title="Total Reflections" value={`0 AVAX`} />
        </div>
      ) : (
        <div className="flex flex-col flex-auto items-center justify-center mb-24">
          <Spinner />
        </div>
      )}
    </>
  )
}

export default Dashboard
