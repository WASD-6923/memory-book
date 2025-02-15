<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class PhotoController extends Controller
{
    /**
     * Загружает несколько файлов и возвращает массив полных путей к ним.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function upload(Request $request): JsonResponse
    {
        Log::info('PhotoController@upload');
        // Проверяем, есть ли файлы в запросе
        if (!$request->hasFile('files')) {
            return response()->json(['error' => 'Файлы не найдены.'], 400);
        }

        // Валидация файлов
        $request->validate([
            'files.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:4096', // Максимум 2 МБ на файл
        ]);

        $uploadedFiles = [];

        // Обрабатываем каждый файл
        foreach ($request->file('files') as $file) {
            // Сохраняем файл в папку storage/app/public/uploads
            $path = $file->store('uploads', 'public');

            $uploadedFiles[] = $path;
            // Получаем полный URL к файлу
            //$fullUrl = Storage::disk('public')->url($path);

            // Добавляем путь в массив
            //$uploadedFiles[] = $fullUrl;
        }

        // Возвращаем массив путей к загруженным файлам
        return response()->json($uploadedFiles);
    }
}
