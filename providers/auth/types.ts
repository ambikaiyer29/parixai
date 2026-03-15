// Shared AuthUser type — identical to core/apps/web/lib/auth/types.ts.
// Copied here so the cloud-specific auth files can import it without
// depending on the core submodule during provider development.

export interface AuthUser {
  id: string
  email: string
  fullName: string | null
  avatarUrl: string | null
}
