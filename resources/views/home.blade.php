<x-layout>
    <div class="h-screen flex flex-col items-center justify-center">
        <div
            id="home"
            data-name="{{ auth()->user()->name }}"
            data-email="{{ auth()->user()->email }}"
        ></div>
        <form action="{{ route('logout') }}" method="post">
            @csrf
            <button class="btn-action">Logout</button>
        </form>
    </div>
</x-layout>