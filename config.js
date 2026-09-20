/*
 * PS4 13.52 configuration profile
 *
 * These values are stored separately from the UI so the frontend
 * can be updated without modifying the configuration layer.
 */

const PS4_CONFIG = Object.freeze({
    firmware: "13.52",

    profileName: "PS4 13.52",

    offsets: Object.freeze({
        k_idt_rsvd: 0x1c1e00,

        k_oid_kern_file: 0x1a2f8a0,
        k_oid_maxfilesperproc: 0x1a2f950,
        k_oid_maxprocperuid: 0x1a3ba88,
        k_oid_maxfiles: 0x1a2f9a8,

        k_arg1_maxfilesperproc: 0x22cc47c,
        k_arg1_maxprocperuid: 0x22cc478,
        k_arg1_maxfiles: 0x22cc474,

        k_sysctl_handle_int: 0x3fa8e0,
        k_prison0: 0x1a5c0c0,
        k_rootvnode: 0x2136e90,

        k_sysent: 0x1102b70,
        k_sysent_661: 0x110a760,

        k_jmp_rsi: 0x4d6d0,

        k_kl_lock: 0xe6c60,
        k_evf_cv: 0x785228
    }),

    /*
     * Integration hooks.
     *
     * The frontend does not execute kernel code. Replace these
     * functions with your own separately implemented integration
     * when appropriate.
     */
    integration: Object.freeze({
        hwSpoof: null,
        payloadLoader: null
    })
});
