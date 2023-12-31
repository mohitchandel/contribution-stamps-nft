/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "../../common";

export type ClaimRequestStruct = {
  contributed: boolean;
  repos: BigNumberish;
  username: string;
};

export type ClaimRequestStructOutput = [
  contributed: boolean,
  repos: bigint,
  username: string
] & { contributed: boolean; repos: bigint; username: string };

export interface IStampInterface extends Interface {
  getFunction(nameOrSignature: "verifyContribution"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "verifyContribution",
    values: [ClaimRequestStruct]
  ): string;

  decodeFunctionResult(
    functionFragment: "verifyContribution",
    data: BytesLike
  ): Result;
}

export interface IStamp extends BaseContract {
  connect(runner?: ContractRunner | null): IStamp;
  waitForDeployment(): Promise<this>;

  interface: IStampInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  verifyContribution: TypedContractMethod<
    [claimRequest: ClaimRequestStruct],
    [boolean],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "verifyContribution"
  ): TypedContractMethod<[claimRequest: ClaimRequestStruct], [boolean], "view">;

  filters: {};
}
