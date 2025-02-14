import { DeepseekClient } from "../clients/deepseek"
import { Clients } from "../../types"

export async function createResources(): Promise<Clients> {

  const deepseekClient = new DeepseekClient()

  return {
    deepseek: deepseekClient,
  }
}