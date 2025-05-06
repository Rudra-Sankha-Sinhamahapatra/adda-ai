import toast from 'react-hot-toast';

export const toastStyles = {
    success: {
        style: {
            background:'#10B981',
            color:'white',
        },
        iconTheme: {
            primary: 'white',
            secondary: '#10B981',
        },
    },
    error: {
        style: {
            background: '#EF4444',
            color: 'white',
        },
        iconTheme: {
            primary:'white',
            secondary: '#EF4444'
        },
    },
    loading: {
        style: {
            background:'#6B7280',
            color:'white'
        },
    },
};

export const showToast = {
    success: (message:string) => toast.success(message,toastStyles.success),
    error: (message:string) => toast.error(message,toastStyles.error),
    loading: (message:string) => toast.loading(message,toastStyles.loading),
};