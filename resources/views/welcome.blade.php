<x-layout>
    <div class="h-screen flex flex-col items-center justify-center">
        <div id="welcome"></div>
        <div>
            <a href="{{ route('register') }}" class="btn-action">Register</a>
            <a href="{{ route('login') }}" class="btn-action">Login</a>
        </div>
    </div>
</x-layout>