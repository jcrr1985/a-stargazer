export interface Updateable {
  id?: number | null;
  version?: number;
  new?: boolean;
  isModified?: boolean;
  isRemoved?: boolean;
  entityTrackerIdBean?: number | null;
  entityNameEnum?: string | null;
  businessKey?: string;
}
